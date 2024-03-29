package com.example.demo;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
interface ScoreRepository extends CrudRepository<Score, Long>{

    List<Score> findAllByUidOrderByTimestmp(Long id);

    @Transactional
    void deleteByTutorialAndUid(Tutorial t, Long uid);

    @Transactional
    Score findByTutorialAndUid(Tutorial t, Long uid);

    @Query(value = "SELECT SUM(tutorial.points) from tutorial INNER JOIN score ON score.tid = tutorial.tid where score.uid = :uid", nativeQuery = true)
    int findByUid(@Param("uid") Long uid);

    @Query(value="SELECT SUM(tutorial.points) as overall, user.username FROM tutorial INNER JOIN score ON score.tid = tutorial.tid INNER JOIN user ON user.uid = score.uid GROUP BY user.username ORDER BY overall DESC LIMIT 10", nativeQuery=true)
    List<Object> findAllTop();
}