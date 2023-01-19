package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.CandidateDto;
import skkuchin.service.domain.Match.Candidate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.repo.CandidateRepo;
import skkuchin.service.repo.KeywordRepo;
import skkuchin.service.repo.UserKeywordRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepo candidateRepo;

    private final UserKeywordRepo userKeywordRepo;
    private final UserRepo userRepo;

    @Transactional
    public void addCandidate(CandidateDto.PostRequest dto) {
        AppUser user = userRepo.findById(dto.getUserId()).orElseThrow();
        AppUser candidate1 = userRepo.findById(dto.getCandidate1Id()).orElseThrow();
        AppUser candidate2 = userRepo.findById(dto.getCandidate2Id()).orElseThrow();
        AppUser candidate3 = userRepo.findById(dto.getCandidate3Id()).orElseThrow();

        Candidate candidate = dto.toEntity(user, candidate1, candidate2, candidate3);
        candidateRepo.save(candidate);
    }

    @Transactional
    public List<CandidateDto.Response> getCandidate(AppUser user) {

        List<AppUser> returnUsers = findReturnUsers(user);

        if (returnUsers.size() > 0) {
            Candidate candidate = Candidate.builder()
                    .user(user)
                    .candidate1(returnUsers.get(0))
                    .candidate2(returnUsers.size() > 1 ? returnUsers.get(1) : null)
                    .candidate3(returnUsers.size() > 2 ? returnUsers.get(2) : null)
                    .build();
            candidateRepo.save(candidate);
        }

        return returnUsers.stream()
                .map(returnUser -> new CandidateDto.Response(
                        returnUser,
                        userKeywordRepo.findByUser(returnUser).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    public List<AppUser> findReturnUsers(AppUser user) {
        int remain = 3; //뽑아야 하는 인원
        List<AppUser> returnUsers = new ArrayList<>();
        List<Long> excludeIds = new ArrayList<>(); //제외 대상인 userId 리스트

        /**
         * 1순위: 겹치는 키워드가 많은 순
         * 키워드 개수가 같으면 학과가 같은 유저가 우선
         */
        List<AppUser> usersOrderByKeyword = orderByKeyword(user, excludeIds);
        returnUsers.addAll(usersOrderByKeyword);
        remain = remain - usersOrderByKeyword.size();

        if (remain > 0) {
            /**
             * 2순위: 키워드 1개 이상 겹치는 유저가 3명 미만일 경우
             * 겹치는 카테고리가 많은 순
             * 카테고리 개수가 같으면 학과가 같은 유저 우선
             */
            List<AppUser> usersOrderByCategory = orderByCategory(user, excludeIds, usersOrderByKeyword);
            returnUsers.addAll(usersOrderByCategory);
            remain = remain - usersOrderByCategory.size();

            if (remain > 0) {
                /**
                 * 3순위: 나머지
                 * 학과가 같은 유저 우선
                 */
                List<AppUser> remainingUsers = findRemainingUsers(user, excludeIds, usersOrderByCategory);
                returnUsers.addAll(remainingUsers);
            }
        }

        if (returnUsers.size() < 3) return returnUsers;
        else return returnUsers.subList(0, 3);
    }
    public List<AppUser> orderByKeyword(AppUser user, List<Long> excludeIds) {
        //유저의 키워드 리스트
        List<Long> keywordIds = userKeywordRepo.findKeywordIdsByUserId(user.getId());
        //이미 매칭 후보로 올랐던 유저는 제외 대상
        List<Candidate> candidates = candidateRepo.findByUserId(user.getId());
        for (int i = 0; i < candidates.size(); i++) {
            Candidate candidate = candidates.get(i);
            excludeIds.add(candidate.getCandidate1().getId());
            if (candidate.getCandidate2() != null) excludeIds.add(candidate.getCandidate2().getId());
            if (candidate.getCandidate3() != null) excludeIds.add(candidate.getCandidate3().getId());
            //excludeIds.addAll(List.of(candidate.getCandidate1().getId(), candidate.getCandidate2().getId(), candidate.getCandidate3().getId()));
        }
        excludeIds.add(user.getId()); //자기 자신도 제외 대상에 포함
        return userKeywordRepo.findUsersByKeywordIds(keywordIds, excludeIds, user.getMajor().name());
    }

    public List<AppUser> orderByCategory(AppUser user, List<Long> excludeIds, List<AppUser> usersOrderByKeyword) {
        List<Long> firstUsers = usersOrderByKeyword.stream().map(u -> u.getId()).collect(Collectors.toList());
        excludeIds.addAll(firstUsers); //1순위로 뽑힌 유저들은 제외 대상
        List<String> categoryList = userKeywordRepo.findCategoryNamesByUserId(user.getId());

        return userKeywordRepo.findUsersByCategoryNames(categoryList, excludeIds, user.getMajor().name());
    }

    public List<AppUser> findRemainingUsers(AppUser user, List<Long> excludeIds, List<AppUser> usersOrderByCategory) {
        List<Long> secondUsers = usersOrderByCategory.stream().map(u -> u.getId()).collect(Collectors.toList());
        excludeIds.addAll(secondUsers); //2순위로 뽑힌 유저들은 제외 대상
        return userKeywordRepo.findRemainUsers(excludeIds, user.getMajor().name());
    }
}
