using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;
using pios.projekt.models.Inteface;
using pios.projekt.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pios.projekt.DAL.Datatabse;
using MongoDB.Bson;
using pios.projekt.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace pios.projekt.API
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddControllers();
			var key = "This is my test key";

			services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(x=>
			{
				x.RequireHttpsMetadata = false;
				x.SaveToken = true;
				x.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
					ValidateIssuer = false,
					ValidateAudience = false

				};
			});

			services.AddSingleton<IJwtAuthenticatinManager>(new JwtAuthenticatinManager(key));
			services.AddSwaggerGen( c =>
			 {
				 c.SwaggerDoc( "v1", new OpenApiInfo { Title = "pios.projekt.API", Version = "v1" } );
			 } );
			services.AddCors(o => o.AddPolicy("AllRequestPolicy", builder =>
			{
				builder
					.SetIsOriginAllowed((host) => true)
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials()
					.WithExposedHeaders("x-pagination");
			}));

			services.Configure<ContextSettings>( options =>
			{
				options.ConnectionString = $"{Configuration.GetSection( "MongoConnection:ConnectionString" ).Value}";
				options.Database = Configuration.GetSection( "MongoConnection:Database" ).Value;
			} );

		



			services.AddSingleton<IClassroomContext, ClassroomContext>();


			services.AddScoped<IClassroomService, ClassrommService>();
			services.AddScoped<IClassroomRepository, ClassroomRepository>();


		}



		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if ( env.IsDevelopment() )
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI( c => c.SwaggerEndpoint( "/swagger/v1/swagger.json", "pios.projekt.API v1" ) );
			}

			app.UseHttpsRedirection();
			app.UseCors("AllRequestPolicy");

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints( endpoints =>
			 {
				 endpoints.MapControllers();
			 } );
		}
	}
}
