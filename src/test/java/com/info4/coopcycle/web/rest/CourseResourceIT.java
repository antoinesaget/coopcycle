package com.info4.coopcycle.web.rest;

import com.info4.coopcycle.GlCoopcycleApp;
import com.info4.coopcycle.domain.Course;
import com.info4.coopcycle.repository.CourseRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.info4.coopcycle.domain.enumeration.CourseState;
import com.info4.coopcycle.domain.enumeration.DeliveryState;
/**
 * Integration tests for the {@link CourseResource} REST controller.
 */
@SpringBootTest(classes = GlCoopcycleApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CourseResourceIT {

    private static final CourseState DEFAULT_STATE = CourseState.IN_PROGRESS;
    private static final CourseState UPDATED_STATE = CourseState.CANCELED;

    private static final DeliveryState DEFAULT_DELIVERY_STATE = DeliveryState.DONE;
    private static final DeliveryState UPDATED_DELIVERY_STATE = DeliveryState.IN_PROGRESS;

    private static final Integer DEFAULT_PREP_TIME = 1;
    private static final Integer UPDATED_PREP_TIME = 2;

    private static final Integer DEFAULT_DELIVERY_TIME = 1;
    private static final Integer UPDATED_DELIVERY_TIME = 2;

    private static final String DEFAULT_DELIVERY_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_DETAILS = "BBBBBBBBBB";

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCourseMockMvc;

    private Course course;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Course createEntity(EntityManager em) {
        Course course = new Course()
            .state(DEFAULT_STATE)
            .deliveryState(DEFAULT_DELIVERY_STATE)
            .prepTime(DEFAULT_PREP_TIME)
            .deliveryTime(DEFAULT_DELIVERY_TIME)
            .deliveryDetails(DEFAULT_DELIVERY_DETAILS);
        return course;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Course createUpdatedEntity(EntityManager em) {
        Course course = new Course()
            .state(UPDATED_STATE)
            .deliveryState(UPDATED_DELIVERY_STATE)
            .prepTime(UPDATED_PREP_TIME)
            .deliveryTime(UPDATED_DELIVERY_TIME)
            .deliveryDetails(UPDATED_DELIVERY_DETAILS);
        return course;
    }

    @BeforeEach
    public void initTest() {
        course = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourse() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course
        restCourseMockMvc.perform(post("/api/courses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isCreated());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate + 1);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testCourse.getDeliveryState()).isEqualTo(DEFAULT_DELIVERY_STATE);
        assertThat(testCourse.getPrepTime()).isEqualTo(DEFAULT_PREP_TIME);
        assertThat(testCourse.getDeliveryTime()).isEqualTo(DEFAULT_DELIVERY_TIME);
        assertThat(testCourse.getDeliveryDetails()).isEqualTo(DEFAULT_DELIVERY_DETAILS);
    }

    @Test
    @Transactional
    public void createCourseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courseRepository.findAll().size();

        // Create the Course with an existing ID
        course.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseMockMvc.perform(post("/api/courses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = courseRepository.findAll().size();
        // set the field null
        course.setState(null);

        // Create the Course, which fails.

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeliveryStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = courseRepository.findAll().size();
        // set the field null
        course.setDeliveryState(null);

        // Create the Course, which fails.

        restCourseMockMvc.perform(post("/api/courses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCourses() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get all the courseList
        restCourseMockMvc.perform(get("/api/courses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(course.getId().intValue())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].deliveryState").value(hasItem(DEFAULT_DELIVERY_STATE.toString())))
            .andExpect(jsonPath("$.[*].prepTime").value(hasItem(DEFAULT_PREP_TIME)))
            .andExpect(jsonPath("$.[*].deliveryTime").value(hasItem(DEFAULT_DELIVERY_TIME)))
            .andExpect(jsonPath("$.[*].deliveryDetails").value(hasItem(DEFAULT_DELIVERY_DETAILS)));
    }
    
    @Test
    @Transactional
    public void getCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", course.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(course.getId().intValue()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.deliveryState").value(DEFAULT_DELIVERY_STATE.toString()))
            .andExpect(jsonPath("$.prepTime").value(DEFAULT_PREP_TIME))
            .andExpect(jsonPath("$.deliveryTime").value(DEFAULT_DELIVERY_TIME))
            .andExpect(jsonPath("$.deliveryDetails").value(DEFAULT_DELIVERY_DETAILS));
    }

    @Test
    @Transactional
    public void getNonExistingCourse() throws Exception {
        // Get the course
        restCourseMockMvc.perform(get("/api/courses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Update the course
        Course updatedCourse = courseRepository.findById(course.getId()).get();
        // Disconnect from session so that the updates on updatedCourse are not directly saved in db
        em.detach(updatedCourse);
        updatedCourse
            .state(UPDATED_STATE)
            .deliveryState(UPDATED_DELIVERY_STATE)
            .prepTime(UPDATED_PREP_TIME)
            .deliveryTime(UPDATED_DELIVERY_TIME)
            .deliveryDetails(UPDATED_DELIVERY_DETAILS);

        restCourseMockMvc.perform(put("/api/courses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourse)))
            .andExpect(status().isOk());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate);
        Course testCourse = courseList.get(courseList.size() - 1);
        assertThat(testCourse.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testCourse.getDeliveryState()).isEqualTo(UPDATED_DELIVERY_STATE);
        assertThat(testCourse.getPrepTime()).isEqualTo(UPDATED_PREP_TIME);
        assertThat(testCourse.getDeliveryTime()).isEqualTo(UPDATED_DELIVERY_TIME);
        assertThat(testCourse.getDeliveryDetails()).isEqualTo(UPDATED_DELIVERY_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingCourse() throws Exception {
        int databaseSizeBeforeUpdate = courseRepository.findAll().size();

        // Create the Course

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseMockMvc.perform(put("/api/courses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(course)))
            .andExpect(status().isBadRequest());

        // Validate the Course in the database
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourse() throws Exception {
        // Initialize the database
        courseRepository.saveAndFlush(course);

        int databaseSizeBeforeDelete = courseRepository.findAll().size();

        // Delete the course
        restCourseMockMvc.perform(delete("/api/courses/{id}", course.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Course> courseList = courseRepository.findAll();
        assertThat(courseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
