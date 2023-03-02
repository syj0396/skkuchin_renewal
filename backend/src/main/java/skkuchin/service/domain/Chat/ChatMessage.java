package skkuchin.service.domain.Chat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;

    private String sender;

    @Column
    private String message;

    @ManyToOne
    private ChatRoom chatRoom;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime Date;


    private int userCount;
}
