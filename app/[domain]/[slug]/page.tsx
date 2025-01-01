export default function Page({params, searchParams}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    console.log('Inside [domain]/[slug]/page.tsx')
    console.log('Params:', params)
    console.log('Search Params:', searchParams)

    return <h1>My Page</h1>
}