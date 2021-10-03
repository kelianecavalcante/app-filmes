import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

import {
    Container,
    SearchContainer,
    Input,
    SearchButton,
    Title,
    BannerButton,
    Banner,
    SliderMovie
} from './styles';

import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie';

import { useNavigation } from '@react-navigation/native'

function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});

    const [input, setInput] = useState('');

    // loading inicia como true
    const [loading, setLoging] = useState(true);

    const navigation = useNavigation();

    // Ao abrir o app é feita a busca dos filmes na base de dados
    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

        async function getMovies() {
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])

            if (isActive) {
                const nowList = getListMovies(10, nowData.data.results);
                const popularList = getListMovies(5, popularData.data.results);
                const topList = getListMovies(5, topData.data.results);

                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);

                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);

                setLoging(false);

            }

        }

        getMovies();

        // Ao sair da tela (Home) garante que não vai ter atualização de estado/parar ação que estava em execução
        return () => {
            isActive = false;
            ac.abort();
        }

    }, [])

    // navegando para a rota selecionada
    function navigationDetailPage(item) {
        navigation.navigate('Detail', { id: item.id })
    }

    function handleSearchMovie() {
        //if (input === '') {
        //    alert('Preecha o campo para busca');
        //    return;
        //}

        //se campo de busca estiver vazio, ao clicar na lupa ñ acontece nada
        if(input === '')return;

        //ao preencher campo de busca e pesquisar na lupa, ao retornar campo é limpo para nova pesquisa
        navigation.navigate('Search', {name :input})
        setInput('');
    }


    // renderização condicional 
    if (loading) {
        return (
            <Container>
                <ActivityIndicator size="large" color="#FFF" />
            </Container>

        )
    }


    // retorno da interface
    return (
        <Container>
            <Header title="Amazing Movies" />

            <SearchContainer >
                <Input
                    placeholder="Ex Vingadores"
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <SearchButton onPress={handleSearchMovie}>
                    <Feather name="search" size={30} color='#FFF' />
                </SearchButton>
            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false} >
                <Title>Em cartaz</Title>

                <BannerButton activeOpacity={0.9} onPress={() => navigationDetailPage(bannerMovie)}>
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    />

                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailPage(item)} />}
                    keyExtrator={(item) => String(item.id)}
                />

                <Title>Populares</Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailPage(item)} />}
                    keyExtrator={(item) => String(item.id)}
                />

                <Title>Mais votados</Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailPage(item)} />}
                    keyExtrator={(item) => String(item.id)}
                />


            </ScrollView>

        </Container>
    )
}

export default Home;