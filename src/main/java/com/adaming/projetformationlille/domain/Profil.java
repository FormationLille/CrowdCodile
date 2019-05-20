package com.adaming.projetformationlille.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Profil.
 */
@Entity
@Table(name = "profil")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Profil implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Min(value = 0)
    @Column(name = "age")
    private Integer age;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "description")
    private String description;

    @Column(name = "date_inscription")
    private LocalDate dateInscription;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "profilPorteur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Projet> projetsPortes = new HashSet<>();
    @ManyToMany(mappedBy = "profilsContributeurs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Projet> projetContribues = new HashSet<>();

    @ManyToMany(mappedBy = "profilsSuiveurs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Projet> projetSuivis = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Profil nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Profil prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Integer getAge() {
        return age;
    }

    public Profil age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Profil photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Profil photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getDescription() {
        return description;
    }

    public Profil description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateInscription() {
        return dateInscription;
    }

    public Profil dateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
        return this;
    }

    public void setDateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
    }

    public User getUser() {
        return user;
    }

    public Profil user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Projet> getProjetsPortes() {
        return projetsPortes;
    }

    public Profil projetsPortes(Set<Projet> projets) {
        this.projetsPortes = projets;
        return this;
    }

    public Profil addProjetsPortes(Projet projet) {
        this.projetsPortes.add(projet);
        projet.setProfilPorteur(this);
        return this;
    }

    public Profil removeProjetsPortes(Projet projet) {
        this.projetsPortes.remove(projet);
        projet.setProfilPorteur(null);
        return this;
    }

    public void setProjetsPortes(Set<Projet> projets) {
        this.projetsPortes = projets;
    }

    public Set<Projet> getProjetContribues() {
        return projetContribues;
    }

    public Profil projetContribues(Set<Projet> projets) {
        this.projetContribues = projets;
        return this;
    }

    public Profil addProjetContribues(Projet projet) {
        this.projetContribues.add(projet);
        projet.getProfilsContributeurs().add(this);
        return this;
    }

    public Profil removeProjetContribues(Projet projet) {
        this.projetContribues.remove(projet);
        projet.getProfilsContributeurs().remove(this);
        return this;
    }

    public void setProjetContribues(Set<Projet> projets) {
        this.projetContribues = projets;
    }

    public Set<Projet> getProjetSuivis() {
        return projetSuivis;
    }

    public Profil projetSuivis(Set<Projet> projets) {
        this.projetSuivis = projets;
        return this;
    }

    public Profil addProjetSuivis(Projet projet) {
        this.projetSuivis.add(projet);
        projet.getProfilsSuiveurs().add(this);
        return this;
    }

    public Profil removeProjetSuivis(Projet projet) {
        this.projetSuivis.remove(projet);
        projet.getProfilsSuiveurs().remove(this);
        return this;
    }

    public void setProjetSuivis(Set<Projet> projets) {
        this.projetSuivis = projets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Profil profil = (Profil) o;
        if (profil.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profil.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Profil{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", age=" + getAge() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", description='" + getDescription() + "'" +
            ", dateInscription='" + getDateInscription() + "'" +
            "}";
    }
}
