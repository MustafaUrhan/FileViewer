using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class StorageFileAdd2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Path",
                table: "StorageFiles",
                newName: "StoragePath");

            migrationBuilder.AddColumn<string>(
                name: "StorageName",
                table: "StorageFiles",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StorageName",
                table: "StorageFiles");

            migrationBuilder.RenameColumn(
                name: "StoragePath",
                table: "StorageFiles",
                newName: "Path");
        }
    }
}
