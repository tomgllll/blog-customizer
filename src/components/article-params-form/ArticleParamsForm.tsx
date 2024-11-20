import { useState, useRef } from 'react';
import clsx from 'clsx';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import textStyles from 'src/ui/text/index.module.scss';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

type Props = {
	formState: Record<string, OptionType>;
	setFormState: React.Dispatch<
		React.SetStateAction<Record<string, OptionType>>
	>;
};

export const ArticleParamsForm = (props: Props) => {
	const [isOpened, setIsOpened] = useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isOpened,
		rootRef: sidebarRef,
		onChange: setIsOpened,
	});

	const handleClick = () => {
		setIsOpened((prevState) => !prevState);
	};

	// Состояние формы
	const [selectedFF, setSelectedFF] = useState(
		props.formState.fontFamilyOption
	);

	const [selectedFontColor, setSelectedFontColor] = useState(
		props.formState.fontColor
	);

	const [selectedBgColor, setSelectedBgColor] = useState(
		props.formState.backgroundColor
	);

	const [selectedContentWidth, setSelectedContentWidth] = useState(
		props.formState.contentWidth
	);

	const [selectedFontSize, setSelectedFontSize] = useState(
		props.formState.fontSizeOption
	);

	// Кнопка 'Применить'
	const onApply = () => {
		props.setFormState({
			...props.formState,
			fontFamilyOption: selectedFF,
			fontColor: selectedFontColor,
			backgroundColor: selectedBgColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		});
	};

	// Кнопка 'Сбросить'
	const handleResetForm = () => {
		props.setFormState(defaultArticleState);
		setSelectedFF(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBgColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
	};

	return (
		<>
			<div ref={sidebarRef}>
				<ArrowButton isOpen={isOpened} onClick={handleClick} />
				<aside
					className={clsx(styles.container, isOpened && styles.container_open)}>
					<form className={styles.form}>
						<h2
							className={clsx(
								textStyles.uppercase,
								textStyles['open-sans'],
								textStyles['size31'],
								textStyles['weight800']
							)}>
							Задайте параметры
						</h2>
						<Select
							title='шрифт'
							selected={selectedFF}
							options={fontFamilyOptions}
							onChange={setSelectedFF}
						/>
						<RadioGroup
							title='размер шрифта'
							name='fontSize'
							selected={selectedFontSize}
							options={fontSizeOptions}
							onChange={setSelectedFontSize}
						/>
						<Select
							title='цвет шрифта'
							selected={selectedFontColor}
							options={fontColors}
							onChange={setSelectedFontColor}
						/>
						<Separator></Separator>
						<Select
							title='цвет фона'
							selected={selectedBgColor}
							options={backgroundColors}
							onChange={setSelectedBgColor}
						/>
						<Select
							title='ширина контента'
							selected={selectedContentWidth}
							options={contentWidthArr}
							onChange={setSelectedContentWidth}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleResetForm}
							/>
							<Button
								title='Применить'
								htmlType='button'
								type='apply'
								onClick={onApply}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
