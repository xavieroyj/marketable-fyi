import { NextRequest, NextResponse } from "next/server";


// This is a catch all route for all domains within the app
export function GET(request: NextRequest) {
    return NextResponse.json({ message: "Hello World" });
}