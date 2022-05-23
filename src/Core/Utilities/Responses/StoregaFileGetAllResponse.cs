namespace Core.Utilities.Responses;
public class StoregaFileGetAllResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ContextType { get; set; }
    public string Extension { get; set; }
    public string Alias { get; set; }
    public string Description { get; set; }
    public DateTime CreateAt { get; set; }
}
