export const Heading1 = (props: HeadingProps) => <h1 className={props.className || ''}>{props.children}</h1>;

export const Heading2 = (props: HeadingProps) => <h2 className={props.className || ''}>{props.children}</h2>;

export const Heading3 = (props: HeadingProps) => <h3 className={props.className || ''}>{props.children}</h3>;

export const Heading4 = (props: HeadingProps) => <h4 className={props.className || ''}>{props.children}</h4>;

export const Heading5 = (props: HeadingProps) => <h5 className={props.className || ''}>{props.children}</h5>;

export const Heading6 = (props: HeadingProps) => <h6 className={props.className || ''}>{props.children}</h6>;

type HeadingProps = {
    className?: string,
    children?: React.ReactNode
}