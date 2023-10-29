using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models.Domain;
using ProductAPI.Models.DTO;
using ProductAPI.Repositories.Interface;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductRepository productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productsDomain = await productRepository.GetAll();

            var productsDto = productsDomain.Select(productDomain => new ProductDto()
            {
                Id = productDomain.Id,
                ProductName = productDomain.ProductName,
                Category = productDomain.Category,
                Price = productDomain.Price,
                Date = productDomain.Date
            }).ToList();

            // Return DTOs
            return Ok(productsDto);
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var productDomain = await productRepository.GetProductById(id);

            if (productDomain == null)
            {
                return NotFound();
            }

            var productDto = new ProductDto
            {
                Id = productDomain.Id,
                ProductName = productDomain.ProductName,
                Category = productDomain.Category,
                Price = productDomain.Price,
                Date = productDomain.Date
            };

            return Ok(productDto);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddProductRequestDto addProductRequestDto)
        {
            var productDomainModel = new Product
            {
                ProductName = addProductRequestDto.ProductName,
                Category = addProductRequestDto.Category,
                Price = addProductRequestDto.Price,
                Date = addProductRequestDto.Date
            };

            var createdProduct = await productRepository.AddProduct(productDomainModel);

            if (createdProduct != null)
            {
                var productDto = new ProductDto
                {
                    Id = createdProduct.Id,
                    ProductName = createdProduct.ProductName,
                    Category = createdProduct.Category,
                    Price = createdProduct.Price,
                    Date = createdProduct.Date
                };

                return CreatedAtAction(nameof(GetById), new { id = productDto.Id }, productDto);
            }
            else
            {
                return BadRequest("Failed to create the product");
            }
        }

        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] EditProductRequestDto editProductRequestDto)
        {
            var updatedProduct = await productRepository.UpdateProduct(id, editProductRequestDto);

            if (updatedProduct == null)
            {
                return NotFound();
            }

            var productDto = new ProductDto
            {
                Id = updatedProduct.Id,
                ProductName = updatedProduct.ProductName,
                Category = updatedProduct.Category,
                Price = updatedProduct.Price,
                Date = updatedProduct.Date
            };

            return Ok(productDto);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deleted = await productRepository.DeleteProduct(id);

            if (!deleted)
            {
                return NotFound(); 
            }

            return NoContent();
        }





    }
}

