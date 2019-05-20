package com.adaming.projetformationlille.web.rest;

import com.adaming.projetformationlille.CrowdCodileApp;

import com.adaming.projetformationlille.domain.Dons;
import com.adaming.projetformationlille.repository.DonsRepository;
import com.adaming.projetformationlille.service.DonsService;
import com.adaming.projetformationlille.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.adaming.projetformationlille.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DonsResource REST controller.
 *
 * @see DonsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CrowdCodileApp.class)
public class DonsResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_MONTANT = 1D;
    private static final Double UPDATED_MONTANT = 2D;

    @Autowired
    private DonsRepository donsRepository;

    @Autowired
    private DonsService donsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDonsMockMvc;

    private Dons dons;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DonsResource donsResource = new DonsResource(donsService);
        this.restDonsMockMvc = MockMvcBuilders.standaloneSetup(donsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dons createEntity(EntityManager em) {
        Dons dons = new Dons()
            .date(DEFAULT_DATE)
            .montant(DEFAULT_MONTANT);
        return dons;
    }

    @Before
    public void initTest() {
        dons = createEntity(em);
    }

    @Test
    @Transactional
    public void createDons() throws Exception {
        int databaseSizeBeforeCreate = donsRepository.findAll().size();

        // Create the Dons
        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dons)))
            .andExpect(status().isCreated());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeCreate + 1);
        Dons testDons = donsList.get(donsList.size() - 1);
        assertThat(testDons.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testDons.getMontant()).isEqualTo(DEFAULT_MONTANT);
    }

    @Test
    @Transactional
    public void createDonsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = donsRepository.findAll().size();

        // Create the Dons with an existing ID
        dons.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dons)))
            .andExpect(status().isBadRequest());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = donsRepository.findAll().size();
        // set the field null
        dons.setDate(null);

        // Create the Dons, which fails.

        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dons)))
            .andExpect(status().isBadRequest());

        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMontantIsRequired() throws Exception {
        int databaseSizeBeforeTest = donsRepository.findAll().size();
        // set the field null
        dons.setMontant(null);

        // Create the Dons, which fails.

        restDonsMockMvc.perform(post("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dons)))
            .andExpect(status().isBadRequest());

        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        // Get all the donsList
        restDonsMockMvc.perform(get("/api/dons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dons.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getDons() throws Exception {
        // Initialize the database
        donsRepository.saveAndFlush(dons);

        // Get the dons
        restDonsMockMvc.perform(get("/api/dons/{id}", dons.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dons.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDons() throws Exception {
        // Get the dons
        restDonsMockMvc.perform(get("/api/dons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDons() throws Exception {
        // Initialize the database
        donsService.save(dons);

        int databaseSizeBeforeUpdate = donsRepository.findAll().size();

        // Update the dons
        Dons updatedDons = donsRepository.findById(dons.getId()).get();
        // Disconnect from session so that the updates on updatedDons are not directly saved in db
        em.detach(updatedDons);
        updatedDons
            .date(UPDATED_DATE)
            .montant(UPDATED_MONTANT);

        restDonsMockMvc.perform(put("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDons)))
            .andExpect(status().isOk());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeUpdate);
        Dons testDons = donsList.get(donsList.size() - 1);
        assertThat(testDons.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testDons.getMontant()).isEqualTo(UPDATED_MONTANT);
    }

    @Test
    @Transactional
    public void updateNonExistingDons() throws Exception {
        int databaseSizeBeforeUpdate = donsRepository.findAll().size();

        // Create the Dons

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonsMockMvc.perform(put("/api/dons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dons)))
            .andExpect(status().isBadRequest());

        // Validate the Dons in the database
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDons() throws Exception {
        // Initialize the database
        donsService.save(dons);

        int databaseSizeBeforeDelete = donsRepository.findAll().size();

        // Delete the dons
        restDonsMockMvc.perform(delete("/api/dons/{id}", dons.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Dons> donsList = donsRepository.findAll();
        assertThat(donsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dons.class);
        Dons dons1 = new Dons();
        dons1.setId(1L);
        Dons dons2 = new Dons();
        dons2.setId(dons1.getId());
        assertThat(dons1).isEqualTo(dons2);
        dons2.setId(2L);
        assertThat(dons1).isNotEqualTo(dons2);
        dons1.setId(null);
        assertThat(dons1).isNotEqualTo(dons2);
    }
}
