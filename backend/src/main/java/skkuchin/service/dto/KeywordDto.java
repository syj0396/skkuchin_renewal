package skkuchin.service.dto;

import lombok.Getter;
import skkuchin.service.domain.Matching.Keyword;

import javax.validation.constraints.NotBlank;

public class KeywordDto {

    @Getter
    public static class Request {
        @NotBlank
        private String name;
        @NotBlank
        private String category;

        public Keyword toEntity() {
            return Keyword.builder()
                    .name(name)
                    .category(category)
                    .build();
        }
    }
}
