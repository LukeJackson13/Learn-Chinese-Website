using LearnChinese.Api.Helpers;

namespace LearnChinese.Api.Tests
{
    public class PinyinHelperTests
    {
        [Theory]
        [InlineData("ni3 hao3", "nǐ hǎo")]
        [InlineData("xie4 xie5", "xiè xie")]
        [InlineData("lv4", "lǜ")]
        [InlineData("nu:3", "nǚ")]
        [InlineData("dou1", "dōu")]
        [InlineData("gui4", "guì")]
        [InlineData("liu4", "liù")]
        [InlineData("Zhong1guo2", "Zhōngguó")]
        public void ConvertsToneNumbersToMarks(string input, string expected)
        {
            Assert.Equal(expected, PinyinHelper.ToToneMarks(input));
        }

        [Fact]
        public void LeavesTonedPinyinUnchanged()
        {
            Assert.Equal("nǐ hǎo", PinyinHelper.ToToneMarks("nǐ hǎo"));
        }

        [Fact]
        public void EmptyInputGivesEmptyString()
        {
            Assert.Equal("", PinyinHelper.ToToneMarks("   "));
        }
    }
}
