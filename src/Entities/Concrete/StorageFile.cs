using Entities.Abstract;

namespace Entities.Concrete;
public class StorageFile : BaseEntity
{
    public string Name { get; set; }
    public string StorageName { get; set; }
    public string StoragePath { get; set; }
    public string ContextType { get; set; }
    public string Extension { get; set; }
    public string Alias { get; set; }
    public string Description { get; set; }

}
