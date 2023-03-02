package skkuchin.service.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatRoom;



import java.time.LocalDateTime;
import java.util.List;
public interface ChatRoomRepo extends JpaRepository<ChatRoom,Long> {
    ChatRoom findByRoomName(String roomName);
    ChatRoom findByRoomId(String roomId);

    @Query("SELECT a FROM ChatRoom a where a.user.id = :senderId " +
            "AND a.receiverRequestStatus = 'ACCEPT'")
    List<ChatRoom> findByNormalSenderId
            (@Param("senderId") Long senderId);

    @Query("SELECT a FROM ChatRoom a where a.user1.id = :senderId " +
            "AND a.receiverRequestStatus = 'ACCEPT'")
    List<ChatRoom> findByNormalReceiverId
            (@Param("senderId") Long senderId);

    @Query("SELECT a FROM ChatRoom a where a.user1.id = :senderId " +
            "AND (a.receiverRequestStatus <> 'ACCEPT' OR a.receiverRequestStatus IS NULL OR a.receiverRequestStatus = '')")
   List<ChatRoom> findByReceiverId
            (@Param("senderId") Long senderId);





    List<ChatRoom> findByExpireDateBefore(LocalDateTime now);
}