using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mir_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IAmazonS3 amazonS3;

        public FilesController(IAmazonS3 amazonS3) {
            this.amazonS3 = amazonS3;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFileAsync(IFormFile file, string? prefix)
        {
            var bucketExists = await amazonS3.DoesS3BucketExistAsync("mir2-bucket-s3");
            if (!bucketExists) return NotFound("Bucket mir2-bucket-s3 does not exist.");
            var request = new PutObjectRequest()
            {
                BucketName = "mir2-bucket-s3",
                Key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{file.FileName}",
                InputStream = file.OpenReadStream()
            };
            request.Metadata.Add("Content-Type", file.ContentType);
            await amazonS3.PutObjectAsync(request);
            return Ok($"File {prefix}/{file.FileName} uploaded to S3 successfully!");
        }
    }
}
