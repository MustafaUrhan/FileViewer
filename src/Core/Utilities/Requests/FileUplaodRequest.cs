using Microsoft.AspNetCore.Http;

namespace Core.Utilities.Requests;
public class FileUplaodRequest
{
    public IFormFile File { get; set; }
    public string Alias { get; set; }
    public string Description { get; set; }

}
