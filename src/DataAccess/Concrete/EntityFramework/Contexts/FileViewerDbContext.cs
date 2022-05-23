using Core.Entities;
using Core.Utilities.IoC;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace DataAccess.Concrete.EntityFramework.Contexts
{
    public class FileViewerDbContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            if (!optionsBuilder.IsConfigured)
            {      
                var connectionString = "Server=127.0.0.1;Port=13306;Database=FileViewer;Uid=root;Pwd=Test1234*;";
                optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
        }


        public DbSet<User> Users { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
        public DbSet<StorageFile> StorageFiles { get; set; }
    }
}
