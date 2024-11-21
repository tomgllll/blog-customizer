import { CSSProperties, useState } from 'react';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';

export const App = () => {
    const [formState, setFormState] = 
        useState<Record<string, OptionType>>(defaultArticleState);
    return (
        <main
            className={styles.main}
            style={
                {
                    '--font-family': formState.fontFamilyOption.value,
                    '--font-size': formState.fontSizeOption.value,
                    '--font-color': formState.fontColor.value,
                    '--container-width': formState.contentWidth.value,
                    '--bg-color': formState.backgroundColor.value,
                } as CSSProperties
            }
        >
            <ArticleParamsForm formState={formState} setFormState={setFormState} />
            <Article />
        </main>
    );
};