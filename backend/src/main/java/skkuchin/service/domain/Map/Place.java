package skkuchin.service.domain.Map;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String detailCategory;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Campus campus;

    private Gate gate;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Double xCoordinate;

    @Column(nullable = false)
    private Double yCoordinate;

    private String serviceTime;

    private String breakTime;

    private Boolean discountAvailability;

    private String discountContent;
}
