namespace MyTransportArrival;

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository;
using Services;
using Services.Interfaces;

public class Startup
{
    public Startup(IConfigurationRoot configuration)
    {
        Configuration = configuration;
    }

    private IConfigurationRoot Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        var securityScheme = new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JSON Web Token based security",
        };

        var securityReq = new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        };

        var contact = new OpenApiContact
        {
            Name = "Michal Matejuk",
            Email = "admin@mmatejuk.com",
            Url = new Uri("http://www.mmatejuk.com")
        };

        var license = new OpenApiLicense
        {
            Name = "Free License",
            Url = new Uri("http://www.mmatejuk.com")
        };

        var info = new OpenApiInfo
        {
            Version = "v1",
            Title = "My Transport Arrival API",
            Description = "Check arrival time of your transport in Gdańsk",
            TermsOfService = new Uri("http://www.example.com"),
            Contact = contact,
            License = license
        };
        
        services.AddAuthentication(o =>
        {
            o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true
            };
        });

        services.AddAuthorization();
        services.AddControllers();
        services.AddSession();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(o =>
        {
            o.SwaggerDoc("v1", info);
            o.AddSecurityDefinition("Bearer", securityScheme);
            o.AddSecurityRequirement(securityReq);
        });
       
        services.AddSingleton(Configuration);
        services.AddHttpClient();
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IDelayService, DelayService>();
        services.AddAutoMapper(config => config.AddProfile(typeof(AutomapperProfile)));
        
        //services.AddDbContext<ApplicationDbContext>(opt => opt.UseInMemoryDatabase("MyTransportArrival"));
        services.AddEntityFrameworkSqlite();
        services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlite("Filename=MyTransportArrival2.db"));
        services.AddDistributedMemoryCache();
        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromSeconds(120);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins("*");
                });
        });
        
    }

    public void Configure(IApplicationBuilder app, IHostApplicationLifetime lifetime)
    {
        
    }
}