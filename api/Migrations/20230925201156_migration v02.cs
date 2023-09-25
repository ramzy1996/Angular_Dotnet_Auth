using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class migrationv02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "employee",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "/hlkeH5PCsDBs11NWwEmWh1t5+YX4VgB2AcE0trcsJqkkyTZ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "employee",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "Z6crtR4HhFPjk3xtvkt7LvQzb0dbVbjE4HMGO7QvqJ5N57Gy");
        }
    }
}
