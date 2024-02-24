import React, { useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import CourseReview from "@view/admin/feedbacks/CourseReview";
import CommentLesson from "@view/admin/feedbacks/CommentLesson";

export default function Feedbacks() {
    const [buttonActive, setButtonActive] = useState("tab1");

    const handleButtonClick = (value) => {
        if (value === buttonActive) {
            return;
        }
        setButtonActive(value);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-xl">
            <TETabs>
                <TETabsItem
                    onClick={() => handleButtonClick("tab1")}
                    active={buttonActive === "tab1"}
                    tag="button"
                >
                    Đánh giá của người dùng
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleButtonClick("tab2")}
                    active={buttonActive === "tab2"}
                    tag="button"
                >
                    Câu hỏi trong bài học
                </TETabsItem>
            </TETabs>
            <TETabsContent>
                <TETabsPane show={buttonActive === "tab1"}>
                    <CourseReview />
                </TETabsPane>
                <TETabsPane show={buttonActive === "tab2"}>
                    <CommentLesson />
                </TETabsPane>
            </TETabsContent>
        </div>
    );
}