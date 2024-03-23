export async function validate(req, schema) {
    const result = schema.safeParse(await req.json());
    if (!result.success) {
      throw new Error(JSON.stringify({ message: 'Invalid request', errors: result.error.errors }));
    }
    return result.data;
  }
  
  export function requestError(e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: JSON.parse(e.message) }, { status: 400 });
    } else {
      console.error('Unexpected error type:', e);
      return NextResponse.json({ error: 'Unexpected error type' }, { status: 500 });
    }
  }
  
  export function serverError(e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: JSON.parse(e.message) }, { status: 500 });
    } else {
      console.error('Unexpected error type:', e);
      return NextResponse.json({ error: 'Unexpected error type' }, { status: 500 });
    }
  }
  