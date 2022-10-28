import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

//Cachear la ruta raíz para hacer uso de todas las carpetas:
const root = process.cwd();

//Function to get all files:
export const getFiles = () => {
    //Función especial del módulo fs que nos permite leer de forma síncrona (no va a haber nada asíncrono en este caso):
    return fs.readdirSync(path.join(root, "data"));
};

export const getFileBySlug = async ( slug ) => {
    const mdxSource = fs.readFileSync(path.join(root, 'data', `${slug}.mdx`), 'utf-8');
    const { data, content } = await matter(mdxSource);
    const source = await serialize(content, {});
    return {
        source,
        frontmatter: {
            slug,
            ...data
        }
    };
};

export const getAllFilesMetadata = () => {
    const files = getFiles();
    return files.reduce((allPosts, postSlug) => {
        const mdxSource = fs.readFileSync(path.join(root, 'data', postSlug), 'utf-8');        
        const { data } = matter(mdxSource);

        return [{...data, slug: postSlug.replace('.mdx', '')}, ...allPosts];
    }, []);
};
