package com.adaming.projetformationlille.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Projet.
 */
@Entity
@Table(name = "projet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Projet implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom_projet", nullable = false)
    private String nomProjet;

    @DecimalMin(value = "0")
    @Column(name = "cout")
    private Double cout;

    @DecimalMin(value = "0")
    @Column(name = "somme_actuelle")
    private Double sommeActuelle;

    @Column(name = "delai")
    private Integer delai;

    @Column(name = "lieu")
    private String lieu;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "photo_video")
    private byte[] photoVideo;

    @Column(name = "photo_video_content_type")
    private String photoVideoContentType;

    @Column(name = "url")
    private String url;

    @Column(name = "contreparties")
    private String contreparties;

    @OneToMany(mappedBy = "projet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Commentaire> commentaires = new HashSet<>();
    @OneToMany(mappedBy = "projet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<News> news = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("projetsPortes")
    private Profil profilPorteur;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "projet_profils_contributeurs",
               joinColumns = @JoinColumn(name = "projet_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "profils_contributeurs_id", referencedColumnName = "id"))
    private Set<Profil> profilsContributeurs = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "projet_profils_suiveurs",
               joinColumns = @JoinColumn(name = "projet_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "profils_suiveurs_id", referencedColumnName = "id"))
    private Set<Profil> profilsSuiveurs = new HashSet<>();

    @ManyToMany(mappedBy = "projets")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Categorie> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomProjet() {
        return nomProjet;
    }

    public Projet nomProjet(String nomProjet) {
        this.nomProjet = nomProjet;
        return this;
    }

    public void setNomProjet(String nomProjet) {
        this.nomProjet = nomProjet;
    }

    public Double getCout() {
        return cout;
    }

    public Projet cout(Double cout) {
        this.cout = cout;
        return this;
    }

    public void setCout(Double cout) {
        this.cout = cout;
    }

    public Double getSommeActuelle() {
        return sommeActuelle;
    }

    public Projet sommeActuelle(Double sommeActuelle) {
        this.sommeActuelle = sommeActuelle;
        return this;
    }

    public void setSommeActuelle(Double sommeActuelle) {
        this.sommeActuelle = sommeActuelle;
    }

    public Integer getDelai() {
        return delai;
    }

    public Projet delai(Integer delai) {
        this.delai = delai;
        return this;
    }

    public void setDelai(Integer delai) {
        this.delai = delai;
    }

    public String getLieu() {
        return lieu;
    }

    public Projet lieu(String lieu) {
        this.lieu = lieu;
        return this;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getDescription() {
        return description;
    }

    public Projet description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPhotoVideo() {
        return photoVideo;
    }

    public Projet photoVideo(byte[] photoVideo) {
        this.photoVideo = photoVideo;
        return this;
    }

    public void setPhotoVideo(byte[] photoVideo) {
        this.photoVideo = photoVideo;
    }

    public String getPhotoVideoContentType() {
        return photoVideoContentType;
    }

    public Projet photoVideoContentType(String photoVideoContentType) {
        this.photoVideoContentType = photoVideoContentType;
        return this;
    }

    public void setPhotoVideoContentType(String photoVideoContentType) {
        this.photoVideoContentType = photoVideoContentType;
    }

    public String getUrl() {
        return url;
    }

    public Projet url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getContreparties() {
        return contreparties;
    }

    public Projet contreparties(String contreparties) {
        this.contreparties = contreparties;
        return this;
    }

    public void setContreparties(String contreparties) {
        this.contreparties = contreparties;
    }

    public Set<Commentaire> getCommentaires() {
        return commentaires;
    }

    public Projet commentaires(Set<Commentaire> commentaires) {
        this.commentaires = commentaires;
        return this;
    }

    public Projet addCommentaires(Commentaire commentaire) {
        this.commentaires.add(commentaire);
        commentaire.setProjet(this);
        return this;
    }

    public Projet removeCommentaires(Commentaire commentaire) {
        this.commentaires.remove(commentaire);
        commentaire.setProjet(null);
        return this;
    }

    public void setCommentaires(Set<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }

    public Set<News> getNews() {
        return news;
    }

    public Projet news(Set<News> news) {
        this.news = news;
        return this;
    }

    public Projet addNews(News news) {
        this.news.add(news);
        news.setProjet(this);
        return this;
    }

    public Projet removeNews(News news) {
        this.news.remove(news);
        news.setProjet(null);
        return this;
    }

    public void setNews(Set<News> news) {
        this.news = news;
    }

    public Profil getProfilPorteur() {
        return profilPorteur;
    }

    public Projet profilPorteur(Profil profil) {
        this.profilPorteur = profil;
        return this;
    }

    public void setProfilPorteur(Profil profil) {
        this.profilPorteur = profil;
    }

    public Set<Profil> getProfilsContributeurs() {
        return profilsContributeurs;
    }

    public Projet profilsContributeurs(Set<Profil> profils) {
        this.profilsContributeurs = profils;
        return this;
    }

    public Projet addProfilsContributeurs(Profil profil) {
        this.profilsContributeurs.add(profil);
        profil.getProjetContribues().add(this);
        return this;
    }

    public Projet removeProfilsContributeurs(Profil profil) {
        this.profilsContributeurs.remove(profil);
        profil.getProjetContribues().remove(this);
        return this;
    }

    public void setProfilsContributeurs(Set<Profil> profils) {
        this.profilsContributeurs = profils;
    }

    public Set<Profil> getProfilsSuiveurs() {
        return profilsSuiveurs;
    }

    public Projet profilsSuiveurs(Set<Profil> profils) {
        this.profilsSuiveurs = profils;
        return this;
    }

    public Projet addProfilsSuiveurs(Profil profil) {
        this.profilsSuiveurs.add(profil);
        profil.getProjetSuivis().add(this);
        return this;
    }

    public Projet removeProfilsSuiveurs(Profil profil) {
        this.profilsSuiveurs.remove(profil);
        profil.getProjetSuivis().remove(this);
        return this;
    }

    public void setProfilsSuiveurs(Set<Profil> profils) {
        this.profilsSuiveurs = profils;
    }

    public Set<Categorie> getCategories() {
        return categories;
    }

    public Projet categories(Set<Categorie> categories) {
        this.categories = categories;
        return this;
    }

    public Projet addCategorie(Categorie categorie) {
        this.categories.add(categorie);
        categorie.getProjets().add(this);
        return this;
    }

    public Projet removeCategorie(Categorie categorie) {
        this.categories.remove(categorie);
        categorie.getProjets().remove(this);
        return this;
    }

    public void setCategories(Set<Categorie> categories) {
        this.categories = categories;
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
        Projet projet = (Projet) o;
        if (projet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), projet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Projet{" +
            "id=" + getId() +
            ", nomProjet='" + getNomProjet() + "'" +
            ", cout=" + getCout() +
            ", sommeActuelle=" + getSommeActuelle() +
            ", delai=" + getDelai() +
            ", lieu='" + getLieu() + "'" +
            ", description='" + getDescription() + "'" +
            ", photoVideo='" + getPhotoVideo() + "'" +
            ", photoVideoContentType='" + getPhotoVideoContentType() + "'" +
            ", url='" + getUrl() + "'" +
            ", contreparties='" + getContreparties() + "'" +
            "}";
    }
}
