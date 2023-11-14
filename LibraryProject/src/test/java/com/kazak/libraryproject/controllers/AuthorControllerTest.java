package com.kazak.libraryproject.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.kazak.libraryproject.controlers.AuthorController;
import com.kazak.libraryproject.entities.Author;
import com.kazak.libraryproject.repositories.AuthorRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.MvcResult;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = AuthorController.class)
@WithMockUser
@AutoConfigureMockMvc
public class AuthorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthorRepository authorRepository;


    private Author createAuthor(Integer id, String name, String lastName)
    {
        Author author = new Author();
        author.setId(id);
        author.setName(name);
        author.setLastName(lastName);
        return author;
    }
    private JSONObject createJSONAuthor (Integer id, String name, String lastName) throws Exception
    {
        JSONObject jo = new JSONObject();
        jo.put("id",id);
        jo.put("lastName",lastName);
        jo.put("name",name);
        return jo;
    }

    @Test
    public void getAuthor_simpleTest() throws Exception
    {
        Mockito.when(authorRepository.findById(666)).thenReturn(Optional.of(createAuthor(666, "Tomek", "Zakrzewski")));
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(
                "/authors/666").accept(
                MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        JSONAssert.assertEquals(createJSONAuthor(666, "Tomek", "Zakrzewski").toString(), result.getResponse()
                .getContentAsString(), false);
    }

    @Test
    public void getAuthor_noAuthorTest() throws Exception
    {
        Mockito.when(authorRepository.findById(667)).thenReturn(Optional.empty());
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(
                "/authors/667").accept(
                MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }

    @Test
    public void getAuthorsWithSearch_emptySearch() throws Exception
    {
        List<Author> authorList = new ArrayList<>();
        authorList.add(createAuthor(1,"Roman","Bratny"));
        authorList.add(createAuthor(2,"Janusz","Przymanowski"));
        Mockito.when(authorRepository.findAll()).thenReturn(authorList);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(
                "/authors/").accept(
                MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        JSONArray a = new JSONArray();
        a.put(createJSONAuthor(1,"Roman","Bratny"));
        a.put(createJSONAuthor(2,"Janusz","Przymanowski"));
        JSONAssert.assertEquals(a.toString(), result.getResponse().getContentAsString(), false);
    }




}
