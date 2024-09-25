"use client";

import React, { useState, FormEvent } from "react";

const Form: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ
        setSubmitted(true); // 送信フラグを設定

        // フォームを送信するための非同期関数を実行
        const form = event.currentTarget;
        const formData = new FormData(form);

        // Google フォームに送信
        fetch(form.action, {
            method: "POST",
            body: formData,
            mode: "no-cors", // CORS の制限を回避する
        }).then(() => {
            // 送信が成功した後の処理
            console.log("Form submitted successfully");
        }).catch((error) => {
            console.error("Error submitting form:", error);
        });
    };

    return (
        <form
            action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSe_nYNfLpIXEjLcFuU3mThSf1x68oyzIXEQjacJfCKIsqbXDA/formResponse"
            // https://docs.google.com/forms/u/0/d/e/[フォームのID]/formResponse
            method="post"
            target="hidden_iframe"
            onSubmit={handleSubmit}
            id="form"
        >
            <div>
                <input type="radio" name="あんぽんたん？" required value="YES!!" id="YES!!" />
                <label htmlFor="YES!!">YES!!</label>
            </div>
            <div>
                <input type="radio" name="あんぽんたん？" required value="NO!!" id="NO!!" />
                <label htmlFor="NO!!">NO!!</label>
            </div>
            
            <div id="finish_vote" className="finish_vote">
                <button type="submit" className="finish_button">投票する</button>
            </div>
            {submitted && (
                <div id="end_message" className="end_message">
                    <p className="end_message_p">投票が完了しています。<br />結果発表までしばらくお待ちください。</p>
                </div>
            )}
        </form>
    );
};

export default Form;
