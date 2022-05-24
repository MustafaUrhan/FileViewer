using Business.Abstract;
using Business.Messages;
using Core.Utilities.Requests;
using Core.Utilities.Results;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class FileManagerController : ControllerBase
{
    private readonly IStorageFileService _storageFileService;
    private readonly string AppDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
    public FileManagerController(IStorageFileService storageFileService)
    {
        _storageFileService = storageFileService;
    }


    [HttpPost]
    public async Task<IActionResult> Add()
    {
        try
        {
            if (!Request.Form.Files.Any())
                return BadRequest("No files found in the request");

            if (Request.Form.Files.Count > 1)
                return BadRequest("Cannot upload more than one file at a time");

            if (Request.Form.Files[0].Length <= 0)
                return BadRequest("Invalid file length, seems to be empty");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

        var file = await _storageFileService.SaveFileAsync(Request.Form.Files[0], AppDirectory);
        if (file != null)
        {
            file.Alias = Request.Form["alias"];
            file.Description = Request.Form["description"];
            var result = await _storageFileService.AddAsync(file);
            if (result.Success)
            {
                return Ok(result);
            }
        }
        return BadRequest(new ErrorResult(BusinessMessages.FailedFileUpload));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, StorageFileUpdateRequest storageFileUpdateRequest)
    {
        var entityResult = await _storageFileService.GetByIdAsync(id);
        if (!entityResult.Success)
        {
            return BadRequest(entityResult.Message);
        }
        entityResult.Data.Alias = storageFileUpdateRequest.Alias;
        entityResult.Data.Description = storageFileUpdateRequest.Description;

        var result = await _storageFileService.UpdateAsync(entityResult.Data);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete( int id)
    {
        var result = await _storageFileService.DeleteAsync(id);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpGet("getbyid")]
    public async Task<IActionResult> GetById(int entityId)
    {
        var result = await _storageFileService.GetByIdAsync(entityId);
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _storageFileService.GetAllAsync();
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result.Data);
    }
}
