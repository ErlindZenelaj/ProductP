using System;
using ProductAPI.Models.Domain;
using ProductAPI.Models.DTO;

namespace ProductAPI.Repositories.Interface
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAll();
        Task<Product> AddProduct(Product product);
        Task<Product> GetProductById(Guid id);
        Task<Product> UpdateProduct(Guid id, EditProductRequestDto editProductRequestDto);
        Task<bool> DeleteProduct(Guid id);


    }

}

