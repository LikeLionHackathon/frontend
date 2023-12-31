import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { TopNav } from "../components/Assets";
import { Button } from "../components/Button";
import { InnerLabel } from "../components/Label";

import domtoimage from "dom-to-image";

import { LoadingPage } from "../components/Loading";

import colorpicker from "@assets/colorpicker.json";

import "./ResultPage.scss";

export const ResultPage = () => {
    const mainDom = useRef();
    const navigate = useNavigate();
    const { id } = useParams();

    const { cardList } = useSelector((state) => state.userData);
    const cardData = cardList.data.filter((card) => card.id == id);

    const [isLoading, setIsLoading] = useState(false);

    const [color, setColor] = useState(0);

    var options = {
        quality: 0.99,
    };

    const onDownloadBtn = () => {
        setIsLoading((isLoading) => true);
        mainDom.current.style.position = "fixed";
        mainDom.current.style.top = "0px";
        mainDom.current.style.left = "0px";

        domtoimage
            .toJpeg(mainDom.current, {})
            .then((dataUrl) => {
                var link = document.createElement("a");
                link.download = "my-image-name.jpeg";
                link.href = dataUrl;
                link.click();
            })
            .then(() => {
                mainDom.current.style.position = "relative";
                setIsLoading((isLoading) => false);
            });
    };

    return (
        <>
            <TopNav
                onPrevBtnClick={() => navigate("/my-marketing")}
                imgSrc={cardData[0].imagePath}
                title={cardData[0].description.productName}
            ></TopNav>

            {isLoading && <LoadingPage></LoadingPage>}

            <div className="result__color-picker">
                <h2>색상을 선택해주세요</h2>
                <div className="result__color-picker-container">
                    {colorpicker.map((value, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => setColor(index)}
                                className="result__color-picker-item"
                                style={{ backgroundColor: colorpicker[index].colorType1 }}
                            ></div>
                        );
                    })}
                </div>
            </div>

            <main className="result-page" ref={mainDom}>
                <div className="result__product_name">
                    <InnerLabel>{cardData[0].description.productName}</InnerLabel>
                </div>

                <div className="result__product-img-container">
                    <img className="product-img-item" src={cardData[0].imagePath}></img>
                </div>

                <div className="result__description-container" style={{ backgroundColor: colorpicker[color].colorType3 }}>
                    <div className="result__description-item">
                        <div className="result__description-item__index" style={{ backgroundColor: colorpicker[color].colorType2 }}>
                            1
                        </div>
                        <div className="result__description-item__content">
                            <div className="content__title" style={{ color: colorpicker[color].colorType2 }}>
                                {cardData[0].description.featureFirst}
                            </div>
                        </div>
                    </div>
                    <div className="result__description-item__split" style={{ borderColor: colorpicker[color].colorType2 }} />

                    <div className="result__description-item">
                        <div className="result__description-item__index" style={{ backgroundColor: colorpicker[color].colorType2 }}>
                            2
                        </div>
                        <div className="result__description-item__content">
                            <div className="content__title" style={{ color: colorpicker[color].colorType2 }}>
                                {cardData[0].description.featureSecond}
                            </div>
                        </div>
                    </div>
                    <div className="result__description-item__split" style={{ borderColor: colorpicker[color].colorType2 }} />

                    <div className="result__description-item">
                        <div className="result__description-item__index" style={{ backgroundColor: colorpicker[color].colorType2 }}>
                            3
                        </div>
                        <div className="result__description-item__content">
                            <div className="content__title" style={{ color: colorpicker[color].colorType2 }}>
                                {cardData[0].description.featureThird}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 안내사항 1 */}
                <div className="result__detail-container">
                    <div className="result__detail-container__heading" style={{ backgroundColor: colorpicker[color].colorType2 }}>
                        중요 안내 사항 1
                    </div>

                    <h1 style={{ color: colorpicker[color].colorType1 }}>{cardData[0].description.featureFirst}</h1>
                    <p>{cardData[0].description.featureDescription1}</p>
                </div>

                {/* <div className="result__product-img-container">
                    <img className="product_img_inner" src={"/img/img_test_2.jpg"}></img>
                </div> */}

                {/* 안내사항 2 */}
                <div className="result__detail-container">
                    <div className="result__detail-container__heading" style={{ backgroundColor: colorpicker[color].colorType2 }}>
                        중요 안내 사항 2
                    </div>

                    <h1 style={{ color: colorpicker[color].colorType1 }}>{cardData[0].description.featureSecond}</h1>
                    <p>{cardData[0].description.featureDescription2}</p>
                </div>

                {/* <div className="result__product-img-container">
                    <img className="product_img_inner" src={"/img/img_test_2.jpg"}></img>
                </div> */}

                {/* 안내사항 3 */}
                <div className="result__detail-container">
                    <div className="result__detail-container__heading" style={{ backgroundColor: colorpicker[color].colorType2 }}>
                        중요 안내 사항 3
                    </div>

                    <h1 style={{ color: colorpicker[color].colorType1 }}>{cardData[0].description.featureThird}</h1>
                    <p>{cardData[0].description.featureDescription3}</p>
                </div>

                {/* <div className="result__product-img-container">
                    <img className="product_img_inner" src={"/img/img_test_2.jpg"}></img>
                </div> */}
            </main>

            <div className="result__save-as-img-container">
                <Button type="primary" onClick={onDownloadBtn} styles={{ backgroundColor: colorpicker[color].colorType1 }}>
                    이미지 다운로드
                </Button>
            </div>
        </>
    );
};
