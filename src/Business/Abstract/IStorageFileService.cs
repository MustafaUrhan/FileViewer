using Core.Utilities.Responses;
using Core.Utilities.Results;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

namespace Business.Abstract;
public interface IStorageFileService
{
    Task<IResult> AddAsync(StorageFile entity);
    Task<IResult> UpdateAsync(StorageFile entity);
    Task<IResult> DeleteAsync(int entityId);
    Task<IDataResult<StorageFile>> GetByIdAsync(int entityId);
    Task<IDataResult<List<StoregaFileGetAllResponse>>> GetAllAsync();
    Task<StorageFile?> SaveFileAsync(IFormFile formFile,string appDirectory);
}
