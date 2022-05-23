using Business.Abstract;
using Business.Messages;
using Core.Utilities.Responses;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

namespace Business.Concrete;
public class StorageFileManager : IStorageFileService
{
    private readonly IStorageFileDal _storageFileDal;

    public StorageFileManager(IStorageFileDal storageFileDal)
    {
        _storageFileDal = storageFileDal;
    }

    public async Task<IResult> AddAsync(StorageFile entity)
    {
        
        await _storageFileDal.Add(entity);
        return new SuccessResult(BusinessMessages.FileAdded);
    }

    public async Task<IResult> UpdateAsync(StorageFile entity)
    {
        entity.UpdatedAt = DateTime.Now;
        await _storageFileDal.Update(entity);
        return new SuccessResult(BusinessMessages.FileUpdated);
    }

    public async Task<IResult> DeleteAsync(int entityId)
    {
        
        var result = await GetByIdAsync(entityId);
        if (!result.Success)
        {
            return new ErrorResult(result.Message);
        }

        result.Data.DeletedAt = DateTime.Now;
        await _storageFileDal.Delete(result.Data);
        return new SuccessResult(BusinessMessages.FileDeleted);
    }

    public async Task<IDataResult<StorageFile>> GetByIdAsync(int entityId)
    {
        var storageFileResult = await _storageFileDal.Get(s => s.Id == entityId);
        if (storageFileResult == null)
        {
            return new ErrorDataResult<StorageFile>(BusinessMessages.EntityNotFound);
        }
        return new SuccessDataResult<StorageFile>(storageFileResult);
    }

    public async Task<IDataResult<List<StoregaFileGetAllResponse>>> GetAllAsync()
    {
        var storageFileList = await _storageFileDal.GetList(null);
        var response = new List<StoregaFileGetAllResponse>();
        if (storageFileList!=null) {
            response = storageFileList.Select(s => new StoregaFileGetAllResponse()
            {
                Id = s.Id,
                Alias = s.Alias,
                ContextType = s.ContextType,
                CreateAt = s.CreateAt,
                Description = s.Description,
                Extension = s.Extension,
                Name = s.Name
            }).ToList();
        }
        return new SuccessDataResult<List<StoregaFileGetAllResponse>>(response);
    }


    public async Task<StorageFile?> SaveFileAsync(IFormFile formFile,string appDirectory)
    {
        if (formFile != null)
        {
            StorageFile file = new StorageFile();
            if (!Directory.Exists(appDirectory))
                Directory.CreateDirectory(appDirectory);
            var storageName = DateTime.Now.Ticks.ToString() + Path.GetExtension(formFile.FileName);
            var storagePath = Path.Combine(appDirectory, storageName);
            file.StoragePath = storagePath;
            file.StorageName = storageName;
            file.Name = formFile.FileName;
            file.Extension = Path.GetExtension(formFile.FileName);
            file.ContextType = formFile.ContentType;

            using (var stream = new FileStream(storagePath, FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
            }

            return file;
        }
        return null;
    }
}
