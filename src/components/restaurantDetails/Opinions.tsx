import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchRestaurantOpinion} from "@/src/services/restaurantOpinion";
import {RestaurantOpinion} from "@/src/interface/restaurant-opinion";
import {useTranslation} from "react-i18next";
import {Restaurant} from "@/src/interface/restaurant";
import StartRating from "@/src/components/restaurantDetails/StartRating";

const Opinions = ({ restaurant }: { restaurant: Restaurant }) => {
    const [opinions, setOpinions] = useState<RestaurantOpinion[]>([]);
    const { t } = useTranslation();

    const getOpinions = async () => {
        const fetchedOpinions = await fetchRestaurantOpinion(restaurant.restaurantId);
        setOpinions(fetchedOpinions);
    };

    useEffect(() => {
        getOpinions();
    }, [restaurant.restaurantId]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.overallText}>{t('overallScore')}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    <View style={styles.verticalLine} />
                    <View style={styles.rating}>
                        <StartRating rating={restaurant.rating} size={30} />
                        <Text style={styles.outOfText}>{t('outOf')} {opinions.length} {t('reviews2')}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.opinionsContainer}>
                {opinions.map((opinion) => (
                    <View key={opinion.id} style={styles.opinionContainer}>
                        <View style={styles.mainContainer}>
                            <Text style={styles.userName}>{opinion.user.name}</Text>
                            <Text style={styles.date}>{new Date(opinion.createdAt).toLocaleDateString('pl-PL')}</Text>
                        </View>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingLabel}>{t('quality')}:</Text>
                            <StartRating rating={opinion.qualityRating} size={20} />
                        </View>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingLabel}>{t('deliveryTime')}:</Text>
                            <StartRating rating={opinion.deliveryRating} size={20} />
                        </View>
                        <Text style={styles.comment}>{opinion.comment}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    topContainer: {
        flexDirection: 'column',
        padding: 30,
        backgroundColor: '#1a1a1a',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    overallText: {
        color: 'white',
        fontSize: 20,
    },
    ratingText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    verticalLine: {
        width: 1,
        height: 40,
        backgroundColor: 'white',
        marginHorizontal: 10,
    },
    rating: {
        flexDirection: 'column',
    },
    outOfText: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    opinionsContainer: {
        padding: 20,
    },
    opinionContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#afaeae',
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 14,
        color: '#2a2a2a',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    ratingLabel: {
        fontSize: 16,
        color: '#555',
        marginRight: 10,
    },
    comment: {
        marginTop: 10,
        fontSize: 16,
        color: '#151414',
    },
});

export default Opinions;
