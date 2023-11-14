package com.kazak.libraryproject.controlers;

import com.kazak.libraryproject.entities.Author;
import com.kazak.libraryproject.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/authors")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @CrossOrigin
    @GetMapping(path="/")
    public Iterable<Author> getAuthors(@RequestParam(required = false) String search) {
        if (search != null) {
            return authorRepository.findByLastNameContaining(search);
        }
        return authorRepository.findAll();
    }
    @CrossOrigin
    @GetMapping(value="/{id}")
    public Author getAuthor(@PathVariable Integer id) {
        Optional<Author> author = authorRepository.findById(id);
        if(author.isPresent())return author.get();
        else throw new ResourceNotFoundException();
    }

    @CrossOrigin
    @PostMapping(path="/")
    public String addNewAuthor (@RequestParam String name
            , @RequestParam String lastName) {
        Author n = new Author();
        n.setName(name);
        n.setLastName(lastName);
        authorRepository.save(n);
        return "Saved";
    }
    @CrossOrigin
    @DeleteMapping(value ="/{id}")
    public @ResponseBody void deleteAuthor(@PathVariable Integer id) {
        authorRepository.deleteById(id);
    }

    @CrossOrigin
    @PatchMapping(value = "/{id}")
    public void updateAuthor(@RequestParam(required = false) String name
            , @RequestParam(required = false) String lastName, @PathVariable Integer id){
        Optional<Author> author = authorRepository.findById(id);
        if(name == null && author.isPresent()) name = author.get().getName();
        if(lastName == null && author.isPresent()) lastName = author.get().getLastName();
        if(author.isPresent()){
            author.get().setName(name);
            author.get().setLastName(lastName);
            authorRepository.save(author.get());
        }
        else{
            throw new ResourceNotFoundException();
        }
    }
}
