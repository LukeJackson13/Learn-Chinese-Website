using System.Text.Json.Serialization;
using LearnChinese.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(sp =>
    new VocabularyService(Path.Combine(sp.GetRequiredService<IWebHostEnvironment>().ContentRootPath, "App_Data")));
builder.Services.AddSingleton<QuizService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serves the built React app (client/ builds into wwwroot). In development, use the Vite dev server instead.
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

// Any non-API route goes to React Router.
app.MapFallbackToFile("index.html");

app.Run();

// Lets the integration tests start the app with WebApplicationFactory<Program>.
public partial class Program { }
