package com.kazak.libraryproject.controlers;

import com.kazak.libraryproject.entities.Author;
import com.kazak.libraryproject.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/authors")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @CrossOrigin
    @GetMapping(path="/")
    public @ResponseBody Iterable<Author> getAllAuthors() {
        // This returns a JSON or XML with the users
        return authorRepository.findAll();
    }
    @CrossOrigin
    @GetMapping(value="/{id}")
    public @ResponseBody Author getAuthor(@PathVariable Integer id) {
        // This returns a JSON or XML with the users
        Optional<Author> author = authorRepository.findById(id);
        if(author.isPresent())return author.get();
        else throw new ResourceNotFoundException();
    }

    @CrossOrigin
    @PostMapping(path="/")
    public @ResponseBody String addNewAuthor (@RequestParam String name
            , @RequestParam String lastName) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

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
    public @ResponseBody void updateAuthor(@RequestParam(required = false) String name
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
