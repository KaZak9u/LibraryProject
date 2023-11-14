package com.kazak.libraryproject.controlers;

import com.kazak.libraryproject.entities.Author;
import com.kazak.libraryproject.entities.Book;
import com.kazak.libraryproject.repositories.AuthorRepository;
import com.kazak.libraryproject.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/books")
public class BookController {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;

    @CrossOrigin
    @GetMapping(path="/")
    public Iterable<Book> getBooks(@RequestParam(required = false) String search) {
        if (search != null){
            return bookRepository.findByTitleContaining(search);
        }
        return bookRepository.findAll();
    }
    @CrossOrigin
    @GetMapping(value="/{id}")
    public Book getBook(@PathVariable Integer id) {
        // This returns a JSON or XML with the users
        Optional<Book> book= bookRepository.findById(id);
        if(book.isPresent())return book.get();
        else throw new ResourceNotFoundException();
    }
    @CrossOrigin
    @PostMapping(path="/")
    public String addNewBook (@RequestParam String title
            , @RequestParam Integer authorId) {
        Optional<Author> author = authorRepository.findById(authorId);
        if(author.isPresent()) {
            Book book = new Book();
            book.setTitle(title);
            book.setAuthor(author.get());
            bookRepository.save(book);
            return "Saved";
        }else throw new ResourceNotFoundException();
    }
    @CrossOrigin
    @DeleteMapping(value ="/{id}")
    public void deleteBook(@PathVariable Integer id) {
        bookRepository.deleteById(id);
    }

    @CrossOrigin
    @PatchMapping(value = "/{id}")
    public void updateBook(@RequestParam(required = false) String title
            , @RequestParam(required = false) Integer authorId, @PathVariable Integer id){
        Optional<Book> book = bookRepository.findById(id);
        if(title == null && book.isPresent()) title = book.get().getTitle();
        if(authorId == null && book.isPresent()) authorId = book.get().getAuthor().getId();
        if(book.isPresent()){
            book.get().setTitle(title);
            Optional<Author> author = authorRepository.findById(authorId);
            if(author.isPresent()){
                book.get().setAuthor(author.get());
            }else{
                throw new ResourceNotFoundException();
            }
            authorRepository.save(author.get());
        }
        else{
            throw new ResourceNotFoundException();
        }
    }
}
