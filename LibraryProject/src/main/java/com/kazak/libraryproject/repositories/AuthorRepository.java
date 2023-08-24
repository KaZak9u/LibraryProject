package com.kazak.libraryproject.repositories;

import com.kazak.libraryproject.entities.Author;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface AuthorRepository extends CrudRepository<Author, Integer> {
    List<Author> findByLastNameContaining(String infix);
}