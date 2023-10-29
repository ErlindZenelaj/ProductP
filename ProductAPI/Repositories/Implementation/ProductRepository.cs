using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models.Domain;
using ProductAPI.Models.DTO;
using ProductAPI.Repositories.Interface;

namespace ProductAPI.Repositories.Implementation
{
	public class ProductRepository: IProductRepository
	{

        public readonly ApplicationDbContext dbContext;

        public ProductRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;

        }


        public async Task<List<Product>> GetAll()
        {
            var products = await dbContext.Products.ToListAsync();

            return products;
        }


        public async Task<Product> GetProductById(Guid id)
        {
            return await dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
        }



        public async Task<Product> AddProduct(Product product)
        {
            try
            {
                dbContext.Products.Add(product);
                await dbContext.SaveChangesAsync();
                return product;
            }
            catch (Exception ex)
            {
             
                return null;
            }
        }

        public async Task<Product> UpdateProduct(Guid id, EditProductRequestDto editProductRequestDto)
        {
            var productDomain = await dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (productDomain == null)
            {
                return null;
            }

            productDomain.ProductName = editProductRequestDto.ProductName;
            productDomain.Category = editProductRequestDto.Category;
            productDomain.Price = editProductRequestDto.Price;
            productDomain.Date = editProductRequestDto.Date;

            await dbContext.SaveChangesAsync();

            return productDomain;
        }

        public async Task<bool> DeleteProduct(Guid id)
        {
            var productDomain = await dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (productDomain == null)
            {
                return false;
            }

            dbContext.Products.Remove(productDomain);
            await dbContext.SaveChangesAsync();

            return true;
        }





    }
}

