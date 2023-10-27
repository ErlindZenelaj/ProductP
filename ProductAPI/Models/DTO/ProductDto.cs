using System;
namespace ProductAPI.Models.DTO
{
	public class ProductDto
	{
        public Guid Id { get; set; }

        public string ProductName { get; set; }

        public string Category { get; set; }

        public int Price { get; set; }

        public DateTime Date { get; set; }
    }
}

