using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace mir_backend.Data {
    public class AuthDbContext: IdentityDbContext {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { 
        
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "effc3715-0621-4d02-bb97-16a53861ea35";
            var writerRoleId = "5c847350-b3f5-4d67-8be5-b8136c6c914c";

            // create reader and writer role
            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                }
            };

            // seed the role
            builder.Entity<IdentityRole>().HasData(roles);

            // create an admin user
            var adminUserId = "2d076651-f6cf-46f4-af02-dfb7357a0a3a";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@admin.com",
                Email = "admin@admin.com",
                NormalizedEmail = "admin@admin.com".ToUpper(),
                NormalizedUserName = "admin@admin.com".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "admin");
            builder.Entity<IdentityUser>().HasData(admin);

            // give roles to admin

            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId,
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId,
                }
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}
