package com.adaming.projetformationlille.web.rest;

import com.adaming.projetformationlille.CrowdCodileApp;

import com.adaming.projetformationlille.domain.Projet;
import com.adaming.projetformationlille.repository.ProjetRepository;
import com.adaming.projetformationlille.service.ProjetService;
import com.adaming.projetformationlille.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.adaming.projetformationlille.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProjetResource REST controller.
 *
 * @see ProjetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CrowdCodileApp.class)
public class ProjetResourceIntTest {

    private static final String DEFAULT_NOM_PROJET = "AAAAAAAAAA";
    private static final String UPDATED_NOM_PROJET = "BBBBBBBBBB";

    private static final Double DEFAULT_COUT = 0D;
    private static final Double UPDATED_COUT = 1D;

    private static final Double DEFAULT_SOMME_ACTUELLE = 0D;
    private static final Double UPDATED_SOMME_ACTUELLE = 1D;

    private static final Integer DEFAULT_DELAI = 1;
    private static final Integer UPDATED_DELAI = 2;

    private static final String DEFAULT_LIEU = "AAAAAAAAAA";
    private static final String UPDATED_LIEU = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO_VIDEO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO_VIDEO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_VIDEO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_VIDEO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CONTREPARTIES = "AAAAAAAAAA";
    private static final String UPDATED_CONTREPARTIES = "BBBBBBBBBB";

    @Autowired
    private ProjetRepository projetRepository;

    @Mock
    private ProjetRepository projetRepositoryMock;

    @Mock
    private ProjetService projetServiceMock;

    @Autowired
    private ProjetService projetService;

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

    private MockMvc restProjetMockMvc;

    private Projet projet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjetResource projetResource = new ProjetResource(projetService);
        this.restProjetMockMvc = MockMvcBuilders.standaloneSetup(projetResource)
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
    public static Projet createEntity(EntityManager em) {
        Projet projet = new Projet()
            .nomProjet(DEFAULT_NOM_PROJET)
            .cout(DEFAULT_COUT)
            .sommeActuelle(DEFAULT_SOMME_ACTUELLE)
            .delai(DEFAULT_DELAI)
            .lieu(DEFAULT_LIEU)
            .description(DEFAULT_DESCRIPTION)
            .photoVideo(DEFAULT_PHOTO_VIDEO)
            .photoVideoContentType(DEFAULT_PHOTO_VIDEO_CONTENT_TYPE)
            .url(DEFAULT_URL)
            .contreparties(DEFAULT_CONTREPARTIES);
        return projet;
    }

    @Before
    public void initTest() {
        projet = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjet() throws Exception {
        int databaseSizeBeforeCreate = projetRepository.findAll().size();

        // Create the Projet
        restProjetMockMvc.perform(post("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isCreated());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeCreate + 1);
        Projet testProjet = projetList.get(projetList.size() - 1);
        assertThat(testProjet.getNomProjet()).isEqualTo(DEFAULT_NOM_PROJET);
        assertThat(testProjet.getCout()).isEqualTo(DEFAULT_COUT);
        assertThat(testProjet.getSommeActuelle()).isEqualTo(DEFAULT_SOMME_ACTUELLE);
        assertThat(testProjet.getDelai()).isEqualTo(DEFAULT_DELAI);
        assertThat(testProjet.getLieu()).isEqualTo(DEFAULT_LIEU);
        assertThat(testProjet.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProjet.getPhotoVideo()).isEqualTo(DEFAULT_PHOTO_VIDEO);
        assertThat(testProjet.getPhotoVideoContentType()).isEqualTo(DEFAULT_PHOTO_VIDEO_CONTENT_TYPE);
        assertThat(testProjet.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testProjet.getContreparties()).isEqualTo(DEFAULT_CONTREPARTIES);
    }

    @Test
    @Transactional
    public void createProjetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projetRepository.findAll().size();

        // Create the Projet with an existing ID
        projet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjetMockMvc.perform(post("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isBadRequest());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomProjetIsRequired() throws Exception {
        int databaseSizeBeforeTest = projetRepository.findAll().size();
        // set the field null
        projet.setNomProjet(null);

        // Create the Projet, which fails.

        restProjetMockMvc.perform(post("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isBadRequest());

        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProjets() throws Exception {
        // Initialize the database
        projetRepository.saveAndFlush(projet);

        // Get all the projetList
        restProjetMockMvc.perform(get("/api/projets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projet.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomProjet").value(hasItem(DEFAULT_NOM_PROJET.toString())))
            .andExpect(jsonPath("$.[*].cout").value(hasItem(DEFAULT_COUT.doubleValue())))
            .andExpect(jsonPath("$.[*].sommeActuelle").value(hasItem(DEFAULT_SOMME_ACTUELLE.doubleValue())))
            .andExpect(jsonPath("$.[*].delai").value(hasItem(DEFAULT_DELAI)))
            .andExpect(jsonPath("$.[*].lieu").value(hasItem(DEFAULT_LIEU.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].photoVideoContentType").value(hasItem(DEFAULT_PHOTO_VIDEO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photoVideo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_VIDEO))))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].contreparties").value(hasItem(DEFAULT_CONTREPARTIES.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllProjetsWithEagerRelationshipsIsEnabled() throws Exception {
        ProjetResource projetResource = new ProjetResource(projetServiceMock);
        when(projetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restProjetMockMvc = MockMvcBuilders.standaloneSetup(projetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProjetMockMvc.perform(get("/api/projets?eagerload=true"))
        .andExpect(status().isOk());

        verify(projetServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProjetsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ProjetResource projetResource = new ProjetResource(projetServiceMock);
            when(projetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restProjetMockMvc = MockMvcBuilders.standaloneSetup(projetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProjetMockMvc.perform(get("/api/projets?eagerload=true"))
        .andExpect(status().isOk());

            verify(projetServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProjet() throws Exception {
        // Initialize the database
        projetRepository.saveAndFlush(projet);

        // Get the projet
        restProjetMockMvc.perform(get("/api/projets/{id}", projet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(projet.getId().intValue()))
            .andExpect(jsonPath("$.nomProjet").value(DEFAULT_NOM_PROJET.toString()))
            .andExpect(jsonPath("$.cout").value(DEFAULT_COUT.doubleValue()))
            .andExpect(jsonPath("$.sommeActuelle").value(DEFAULT_SOMME_ACTUELLE.doubleValue()))
            .andExpect(jsonPath("$.delai").value(DEFAULT_DELAI))
            .andExpect(jsonPath("$.lieu").value(DEFAULT_LIEU.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.photoVideoContentType").value(DEFAULT_PHOTO_VIDEO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photoVideo").value(Base64Utils.encodeToString(DEFAULT_PHOTO_VIDEO)))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.contreparties").value(DEFAULT_CONTREPARTIES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProjet() throws Exception {
        // Get the projet
        restProjetMockMvc.perform(get("/api/projets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjet() throws Exception {
        // Initialize the database
        projetService.save(projet);

        int databaseSizeBeforeUpdate = projetRepository.findAll().size();

        // Update the projet
        Projet updatedProjet = projetRepository.findById(projet.getId()).get();
        // Disconnect from session so that the updates on updatedProjet are not directly saved in db
        em.detach(updatedProjet);
        updatedProjet
            .nomProjet(UPDATED_NOM_PROJET)
            .cout(UPDATED_COUT)
            .sommeActuelle(UPDATED_SOMME_ACTUELLE)
            .delai(UPDATED_DELAI)
            .lieu(UPDATED_LIEU)
            .description(UPDATED_DESCRIPTION)
            .photoVideo(UPDATED_PHOTO_VIDEO)
            .photoVideoContentType(UPDATED_PHOTO_VIDEO_CONTENT_TYPE)
            .url(UPDATED_URL)
            .contreparties(UPDATED_CONTREPARTIES);

        restProjetMockMvc.perform(put("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProjet)))
            .andExpect(status().isOk());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeUpdate);
        Projet testProjet = projetList.get(projetList.size() - 1);
        assertThat(testProjet.getNomProjet()).isEqualTo(UPDATED_NOM_PROJET);
        assertThat(testProjet.getCout()).isEqualTo(UPDATED_COUT);
        assertThat(testProjet.getSommeActuelle()).isEqualTo(UPDATED_SOMME_ACTUELLE);
        assertThat(testProjet.getDelai()).isEqualTo(UPDATED_DELAI);
        assertThat(testProjet.getLieu()).isEqualTo(UPDATED_LIEU);
        assertThat(testProjet.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProjet.getPhotoVideo()).isEqualTo(UPDATED_PHOTO_VIDEO);
        assertThat(testProjet.getPhotoVideoContentType()).isEqualTo(UPDATED_PHOTO_VIDEO_CONTENT_TYPE);
        assertThat(testProjet.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testProjet.getContreparties()).isEqualTo(UPDATED_CONTREPARTIES);
    }

    @Test
    @Transactional
    public void updateNonExistingProjet() throws Exception {
        int databaseSizeBeforeUpdate = projetRepository.findAll().size();

        // Create the Projet

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjetMockMvc.perform(put("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isBadRequest());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProjet() throws Exception {
        // Initialize the database
        projetService.save(projet);

        int databaseSizeBeforeDelete = projetRepository.findAll().size();

        // Delete the projet
        restProjetMockMvc.perform(delete("/api/projets/{id}", projet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Projet.class);
        Projet projet1 = new Projet();
        projet1.setId(1L);
        Projet projet2 = new Projet();
        projet2.setId(projet1.getId());
        assertThat(projet1).isEqualTo(projet2);
        projet2.setId(2L);
        assertThat(projet1).isNotEqualTo(projet2);
        projet1.setId(null);
        assertThat(projet1).isNotEqualTo(projet2);
    }
}
