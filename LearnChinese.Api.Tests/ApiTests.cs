using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using LearnChinese.Api.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace LearnChinese.Api.Tests
{
    // Starts the real API in memory, with its data in a temp folder so your own words.json is never touched.
    public class ApiTests : IClassFixture<ApiTests.Factory>
    {
        // Same as the API: enums are sent as names, e.g. "HanziToPinyin".
        private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };
        private readonly HttpClient _client;

        public ApiTests(Factory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task SwaggerDocumentGenerates()
        {
            var response = await _client.GetAsync("/swagger/v1/swagger.json");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task QuizRoundTrip()
        {
            var question = await _client.GetFromJsonAsync<QuizQuestion>("/api/quiz/question?mode=HanziToPinyin", Json);
            Assert.NotNull(question);

            var response = await _client.PostAsJsonAsync("/api/quiz/answer", new { question.WordId, ChosenId = question.WordId });
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<AnswerResult>();
            Assert.True(result!.Correct);
        }

        [Fact]
        public async Task AddWordConvertsPinyinAndRejectsMissingFields()
        {
            var added = await _client.PostAsJsonAsync("/api/words", new { Hanzi = "綠", Pinyin = "lv4", English = "green", Category = "Test" });
            Assert.Equal(HttpStatusCode.Created, added.StatusCode);
            Assert.Contains("lǜ", await added.Content.ReadAsStringAsync());

            var invalid = await _client.PostAsJsonAsync("/api/words", new { Hanzi = "" });
            Assert.Equal(HttpStatusCode.BadRequest, invalid.StatusCode);
        }

        private record AnswerResult(bool Correct);

        public class Factory : WebApplicationFactory<Program>
        {
            private readonly string _dataDir = Path.Combine(Path.GetTempPath(), "LearnChineseTests", Guid.NewGuid().ToString());

            protected override void ConfigureWebHost(IWebHostBuilder builder)
            {
                builder.UseEnvironment("Development");
                builder.ConfigureTestServices(services =>
                {
                    services.AddSingleton(new VocabularyService(_dataDir));
                });
            }

            protected override void Dispose(bool disposing)
            {
                base.Dispose(disposing);
                if (Directory.Exists(_dataDir)) Directory.Delete(_dataDir, recursive: true);
            }
        }
    }
}
