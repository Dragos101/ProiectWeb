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

        public FilesController(IAmazonS3 amazonS3)
        {
            this.amazonS3 = amazonS3;
        }

        [HttpPost]
        [Route("/files")]
        public async Task<IActionResult> UploadFileAsync(IFormFile file, string? prefix)
        {
            var bucketName = "mir2-bucket-s3";
            var bucketExists = await amazonS3.DoesS3BucketExistAsync(bucketName);
            if (!bucketExists) return NotFound("Bucket does not exist.");

            var key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix.TrimEnd('/')}/{file.FileName}";

            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = key,
                InputStream = file.OpenReadStream(),
                CannedACL = S3CannedACL.PublicRead // Make the file publicly accessible
            };
            request.Metadata.Add("Content-Type", file.ContentType);
            await amazonS3.PutObjectAsync(request);

            // Generate the file URL
            var fileUrl = $"https://{bucketName}.s3.amazonaws.com/{key}";

            return Ok(new { Message = $"File {key} uploaded to S3 successfully!", Url = fileUrl });
        }
    }
}
