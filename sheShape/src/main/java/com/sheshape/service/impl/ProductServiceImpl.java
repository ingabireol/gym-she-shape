package com.sheshape.service.impl;

import com.sheshape.dto.ProductDto;
import com.sheshape.exception.BadRequestException;
import com.sheshape.exception.ResourceNotFoundException;
import com.sheshape.model.Product;
import com.sheshape.repository.ProductRepository;
import com.sheshape.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<ProductDto> getAllActiveProducts(Pageable pageable) {
        return productRepository.findByIsActiveTrue(pageable)
                .map(ProductDto::new);
    }

    @Override
    public Page<ProductDto> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(ProductDto::new);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        return new ProductDto(product);
    }

    @Override
    public Page<ProductDto> getProductsByCategory(String category, Pageable pageable) {
        return productRepository.findByCategoryAndIsActiveTrue(category, pageable)
                .map(ProductDto::new);
    }

    @Override
    public Page<ProductDto> searchProducts(String keyword, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(keyword, pageable)
                .map(ProductDto::new);
    }

    @Override
    public List<ProductDto> getProductsInStock() {
        return productRepository.findByIsActiveTrueAndInventoryCountGreaterThan(0).stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setDiscountPrice(productDto.getDiscountPrice());
        product.setInventoryCount(productDto.getInventoryCount());
        product.setImageUrl(productDto.getImageUrl());
        product.setCategory(productDto.getCategory());
        product.setIsActive(productDto.getIsActive() != null ? productDto.getIsActive() : true);
        
        Product savedProduct = productRepository.save(product);
        
        return new ProductDto(savedProduct);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        if (productDto.getName() != null) {
            product.setName(productDto.getName());
        }
        
        if (productDto.getDescription() != null) {
            product.setDescription(productDto.getDescription());
        }
        
        if (productDto.getPrice() != null) {
            product.setPrice(productDto.getPrice());
        }
        
        if (productDto.getDiscountPrice() != null) {
            product.setDiscountPrice(productDto.getDiscountPrice());
        }
        
        if (productDto.getInventoryCount() != null) {
            product.setInventoryCount(productDto.getInventoryCount());
        }
        
        if (productDto.getImageUrl() != null) {
            product.setImageUrl(productDto.getImageUrl());
        }
        
        if (productDto.getCategory() != null) {
            product.setCategory(productDto.getCategory());
        }
        
        if (productDto.getIsActive() != null) {
            product.setIsActive(productDto.getIsActive());
        }
        
        Product updatedProduct = productRepository.save(product);
        
        return new ProductDto(updatedProduct);
    }

    @Override
    @Transactional
    public ProductDto activateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        product.setIsActive(true);
        Product activatedProduct = productRepository.save(product);
        
        return new ProductDto(activatedProduct);
    }

    @Override
    @Transactional
    public ProductDto deactivateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        product.setIsActive(false);
        Product deactivatedProduct = productRepository.save(product);
        
        return new ProductDto(deactivatedProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        productRepository.delete(product);
    }

    @Override
    @Transactional
    public boolean updateInventory(Long id, int quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        if (product.getInventoryCount() < quantity) {
            return false; // Not enough inventory
        }
        
        product.setInventoryCount(product.getInventoryCount() - quantity);
        productRepository.save(product);
        
        return true;
    }
}