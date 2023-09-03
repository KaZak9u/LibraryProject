package com.kazak.libraryproject.repositories;

import com.kazak.libraryproject.entities.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface BookRepository extends CrudRepository<Book, Integer> {
    List<Book> findByTitleContaining(String infix);
}
