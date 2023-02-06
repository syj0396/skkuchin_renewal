package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {
    ChatRoom findByRoomName(String roomName);
    ChatRoom findByRoomId(String roomId);
    List<ChatRoom> findByUserAndSenderAcceptedAndReceiverAccepted
            (AppUser user, boolean senderAccepted,boolean receiverAccepted);
    List<ChatRoom> findByUser1AndSenderAcceptedAndReceiverAccepted
            (AppUser user, boolean senderAccepted, boolean receiverAccepted);
}