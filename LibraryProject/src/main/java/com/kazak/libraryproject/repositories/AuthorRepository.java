package com.kazak.libraryproject.repositories;

import com.kazak.libraryproject.entities.Author;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface AuthorRepository extends CrudRepository<Author, Integer> {

}