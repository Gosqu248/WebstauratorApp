import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const StarRating = ({ rating, size = 20, showRating = false }) => {
    const validRating = typeof rating === 'number' && rating >= 0 && rating <= 5 ? rating : 0;

    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <View style={styles.container}>
            <View style={styles.starContainer}>
                {[...Array(fullStars)].map((_, index) => (
                    <FontAwesome key={`full-${index}`} name="star" size={size} color={Colors.iconOrange} style={styles.star} />
                ))}
                {halfStar === 1 && <FontAwesome name="star-half" size={size} color={Colors.iconOrange} style={styles.star} />}
                {[...Array(emptyStars)].map((_, index) => (
                    <FontAwesome key={`empty-${index}`} name="star-o" size={size} color={Colors.iconOrange} style={styles.star} />
                ))}
            </View>
            {showRating && <Text style={[styles.ratingText, { fontSize: size * 0.6 }]}>({validRating.toFixed(1)})</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    star: {
        marginHorizontal: 2,
    },
    ratingText: {
        marginLeft: 8,
        color: Colors.mediumDark,
        fontWeight: 'bold',
    },
});

export default StarRating;
