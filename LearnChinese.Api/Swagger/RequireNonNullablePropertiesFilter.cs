using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace LearnChinese.Api.Swagger
{
    /// <summary>
    /// Marks every property that can't be null as required in swagger.json, so the generated
    /// TypeScript types say "hanzi: string" rather than "hanzi?: string".
    /// </summary>
    public class RequireNonNullablePropertiesFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            foreach (var (name, property) in schema.Properties)
            {
                if (!property.Nullable) schema.Required.Add(name);
            }
        }
    }
}
